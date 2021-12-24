import {Component, OnInit} from '@angular/core';
import Tile from "ol/layer/Tile";
import View from "ol/View";
import MAP from "ol/Map";
import Point from "ol/geom/Point";

import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from "ol/layer/Tile";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {style} from "@angular/animations";
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import Control from "ol/control/Control";
import LayerGroup from "ol/layer/Group";

const place = [37.41, 8.82];
const point = new Point(place);


@Component({
  selector: 'app-salepoint-ol',
  templateUrl: './salepoint-ol.component.html',
  styleUrls: ['./salepoint-ol.component.css']
})
export class SalepointOlComponent implements OnInit {

  map;
  wms;

  constructor() {
  }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1,
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3,
        }),
      }),
    });

    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          'http://94.130.228.242:8082/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=topp:states&formatName=GML2&FILTER=%3Cogc:Filter%20xmlns:ogc=%22http://www.opengis.net/ogc%22%3E%3Cogc:PropertyIsGreaterThan%3E%3Cogc:Div%3E%3Cogc:PropertyName%3EMANUAL%3C/ogc:PropertyName%3E%3Cogc:PropertyName%3EWORKERS%3C/ogc:PropertyName%3E%3C/ogc:Div%3E%3Cogc:Literal%3E0.25%3C/ogc:Literal%3E%3C/ogc:PropertyIsGreaterThan%3E%3C/ogc:Filter%3E' +
          extent.join(',') +
          ',EPSG:3857'
        );
      },
      strategy: bboxStrategy,

    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
         url: 'http://localhost:8082/geoserver/geosale/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosale%3AITA_adm1&maxFeatures=50&outputFormat=application%2Fjson',
        // url: 'https://openlayers.org/en/v5.1.3/examples/data/geojson/countries.geojson', //world
        // url: 'http://localhost:8081/geoserver/geosale/wms?service=WMS&version=1.1.0&request=GetMap&layers=geosale%3Agadm36_NLD_2&bbox=3.3607819080352783%2C50.72349166870117%2C7.227095127105656%2C53.55458450317383&width=768&height=562&srs=EPSG%3A4326&styles=&format=application/openlayers',
        format: new GeoJSON(),
      }),
      style: function (feature) {
        style.getText().setText(feature.get('name'));
        return style;
      },
    });


    const baseMap = new Tile({source: new OSM()});
    const regionBoarder = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8082/geoserver/geosale/wms',
         params: {'LAYERS': 'geosale:ITA_adm1', 'TILED': true},
        // params: {'LAYERS': 'geosale:gadm36_NLD_2', 'TILED': true},
        serverType: 'geoserver',
        // transition: 0,
      }),
      opacity: 0.5
    });

    const vector = new VectorLayer({
      source: vectorSource,

      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
      }),
    });

    const grp = new LayerGroup({
      layers: [baseMap, regionBoarder],
    });

    this.map = new MAP({
      target: 'map',
      layers: [grp ],
      view: new View({
        projection: 'EPSG:900913',
        center: [-78906677.036667, 5444438.895],
        zoom: 4
      }),
    });
  }
}
