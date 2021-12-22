import {Component, OnInit} from '@angular/core';
import Tile from "ol/layer/Tile";
import View from "ol/View";
import MAP from "ol/Map";
import Point from "ol/geom/Point";

// @ts-ignore
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from "ol/layer/Tile";

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
  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new MAP({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8081/geoserver/geosale/wms',
            params: {'LAYERS': 'geosale:ITA_adm1', 'TILED': true},
            serverType: 'geoserver',
            // transition: 0,
          }),
          opacity: 0.5
        }),
      ],
      view: new View({
        projection: 'EPSG:900913',
        center: [-10997148, 4569099],
        zoom: 4
      })
    });
  }
}
