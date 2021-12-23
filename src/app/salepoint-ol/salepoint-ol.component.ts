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

    this.map = new MAP({
      target: 'map',
      layers: [baseMap, regionBoarder],
      view: new View({
        projection: 'EPSG:900913',
        center: [-78906677.036667, 5444438.895],
        zoom: 4
      }),

    });
  }
}
