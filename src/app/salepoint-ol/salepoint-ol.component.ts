import {Component, OnInit} from '@angular/core';
import Tile from "ol/layer/Tile";
import View from "ol/View";
import MAP from "ol/Map";

import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from "ol/layer/Tile";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style} from 'ol/style';
import LayerGroup from "ol/layer/Group";
import Overlay from "ol/Overlay";
import {SalepointOlService} from "./shared/salepoint-ol.service";
import {GeosTo} from "./model/GeosTo";

@Component({
  selector: 'app-salepoint-ol',
  templateUrl: './salepoint-ol.component.html',
  styleUrls: ['./salepoint-ol.component.css']
})
export class SalepointOlComponent implements OnInit {


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
        url: 'http://localhost:8082/geoserver/geosale/wms',
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
        url: 'http://localhost:8082/geoserver/geosale/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosale%3AITA_adm1&maxFeatures=50&outputFormat=application%2Fjson',
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

    let selects1  = new Set<string>();

    function selectMap() {
      return function(features) {
        if (!features.length) {
          selection = {};
          selects1.clear();
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
          selects1.delete(fid.toString());
          delete selection[fid];
          selectionLayer.changed();
          return;
        }
        selects1.add(fid);
        console.log('se', selects1);

        selection[fid] = feature;
        // console.log('feuture ', fid.valueOf());
        selectionLayer.changed();
        // console.log(selection);
      }
    }
    map.on('click', function ( e) {
      // map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      //   let clickedCoordinate = e.coordinate;
      //   let clickedFeatureId : any = feature.getId();
      //   overlayLayer.setPosition(clickedCoordinate);
      //   overLayFeatureId.innerHTML = clickedFeatureId;
      //
      //   console.log(clickedFeatureId);// get the codes
      // })
      vectorLayer.getFeatures(e.pixel).then( selectMap())
    });

     this.geoList = selects1;
    // map.on('click', function (e) {
    //   console.log(e.coordinate);
    // })

    //TODO Add to tree
    //TODO Remove from tree
    //TODO Get the name of chosen from DB
    //TODO Show name of chosen from DB in a grid
    //TODO Add the swith of Layers
    // TODO change Style and color
    // TODO test working with wms
    //TODO Add Geo-code column to comune and ...

    //TODO Call the filter
    //TODO Add Form Sale point under the map
    //TODO Add the Province
    //TODO Add the Comune
    //TODO test the performane
    // TODO Add the netherlands
    // TODO Add the switcher fro markets
    // TODO Create the parameter
    // TODO Add potential to PVs

  }

  onSubmit(){
    this.service.getGeos(this.geoList);
  }
}
