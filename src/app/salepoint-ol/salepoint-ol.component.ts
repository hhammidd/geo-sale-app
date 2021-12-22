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
          source: new OSM(),
        }),
        new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),
        // new TileLayer({
        //   extent: [-13884991, 2870341, -7455066, 6338219],
        //   source: new TileWMS({
        //     url: 'http://localhost:8081/geoserver/wms',
        //     params: {'LAYERS': 'tiger:giant_polygon', 'TILED': true},
        //     serverType: 'geoserver',
        //     // Countries have transparency, so do not fade tiles:
        //     transition: 0,
        //   }),
        // }),
      ],
      view: new View({
        center: [-10997148, 4569099],
        zoom: 4
      })
    });
  }
}
