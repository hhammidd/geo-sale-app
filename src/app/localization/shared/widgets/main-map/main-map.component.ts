import { Component, OnInit } from '@angular/core';
import {SalepointOlService} from "../../../../salepoint-ol/shared/salepoint-ol.service";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import {Fill, Stroke, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
import MAP from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";

@Component({
  selector: 'main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  geoList = new Set<string>(); // to prevent duplication

  constructor(public service: SalepointOlService) {
  }

  selects: string[] = [];

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {

    const regionBoarder = new TileLayer({
      source: new TileWMS({
        url: 'http://94.130.228.242:8082/geoserver/geosale/wms',
        params: {'LAYERS': 'geosale:ITA_adm1', 'TILED': true},
        serverType: 'geoserver',
      }),
      opacity: 0.5
    });

    const country = new Style({
      stroke: new Stroke({
        color: 'gray',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgb ( 185, 125, 75, 0.1 )',
      }),
    });

    const selectedCountry = new Style({
      stroke: new Stroke({
        color: 'rgb(46,139,87,0.9)',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgb(46,139,87,0.5)',
      }),
    });


    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'http://94.130.228.242:8082/geoserver/geosale/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosale%3AITA_adm1&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
      }),
      style: country,
      opacity: 0.1 // Already in country
    });

    const baseMap = new Tile({source: new OSM()});
    const grp = new LayerGroup({
      layers: [baseMap, vectorLayer, regionBoarder],
    });

    const map = new MAP({
      target: 'map',
      layers: [grp ],
      view: new View({
        center: [-78906677.036667, 5444438.895],
        zoom: 5
      }),
    });
    // Selection
    const selectionLayer = new VectorLayer({
      map: map,
      source: vectorLayer.getSource(),
      style: function (feature) {
        if (feature.getId()! in selection) {
          return selectedCountry;
        }
      },
    });

    let selection = {};

    const overlayContainerElement: HTMLElement = document.querySelector('.overlay-container')!;
    const overlayLayer = new Overlay({
      element: overlayContainerElement
    });
    map.addOverlay(overlayLayer);

    let geoSelected  = new Set<string>();

    function selectMap() {
      return function(features) {
        if (!features.length) {
          selection = {};
          geoSelected.clear();
          selectionLayer.changed();
          return;
        }
        const feature = features[0];
        if (!feature) {
          return;
        }

        const fid : any = feature.getId();
        if (fid in selection) { // remove double click
          console.log('', fid);
          geoSelected.delete(fid.toString());
          delete selection[fid];
          selectionLayer.changed();
          return;
        }
        geoSelected.add(fid);
        selection[fid] = feature;
        selectionLayer.changed();
      }
    }
    map.on('click', function ( e) {
      vectorLayer.getFeatures(e.pixel).then( selectMap())
    });

    this.geoList = geoSelected;
  }

  onSubmit(){
    console.log('geo to be filtered: ', this.geoList);
    this.service.getGeos(this.geoList);
  }

}
