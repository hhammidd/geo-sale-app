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
          'http://94.130.228.242:8081/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=topp:states&formatName=GML2&FILTER=%3Cogc:Filter%20xmlns:ogc=%22http://www.opengis.net/ogc%22%3E%3Cogc:PropertyIsGreaterThan%3E%3Cogc:Div%3E%3Cogc:PropertyName%3EMANUAL%3C/ogc:PropertyName%3E%3Cogc:PropertyName%3EWORKERS%3C/ogc:PropertyName%3E%3C/ogc:Div%3E%3Cogc:Literal%3E0.25%3C/ogc:Literal%3E%3C/ogc:PropertyIsGreaterThan%3E%3C/ogc:Filter%3E' +
          extent.join(',') +
          ',EPSG:3857'
        );
      },
      strategy: bboxStrategy,

    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'http://localhost:8081/geoserver/geosale/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosale%3AITA_adm1&maxFeatures=50&outputFormat=application%2Fjson',
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
        url: 'http://localhost:8081/geoserver/geosale/wms',
        params: {'LAYERS': 'geosale:ITA_adm1', 'TILED': true},
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

    this.map = new MAP({
      target: 'map',
      layers: [baseMap, vectorLayer ],
      view: new View({
        projection: 'EPSG:900913',
        center: [-78906677.036667, 5444438.895],
        zoom: 4
      }),
    });
  }
}
