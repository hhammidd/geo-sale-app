import {Component, OnInit} from '@angular/core';
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
import {GeosName} from "../../model/GeosName";
import {MapGeoService} from "../../map-geo.service";
import {RegionTo} from "../../model/RegionTo";

@Component({
  selector: 'main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  dataSourcebb: GeosName[] = []
  deletedGeo: string = ''
  deselectAllValue: string = ''
  selectedCountryName: string = ''

  geoList = new Set<string>(); // to prevent duplication

  constructor(public service: SalepointOlService,
              public mapGeoService: MapGeoService) {
  }

  selects: string[] = [];
  selectionLayer: any;
  selection: any = {}
  geoSelected = new Set<any>();

  regions: RegionTo[] = []

  selectedCountry = new Style({
    stroke: new Stroke({
      color: 'rgb(46,139,87,0.9)',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgb(46,139,87,0.5)',
    }),
  });

  country = new Style({
    stroke: new Stroke({
      color: 'gray',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgb ( 185, 125, 75, 0.1 )',
    }),
  });
  map = new MAP({})
  baseMap = new Tile({source: new OSM()});

  ngOnInit(): void {
    this.mapGeoService.getRegions().subscribe(res => this.regions = res);
    this.mapGeoService.currentMessage.subscribe(message => this.dataSourcebb = message)
    this.mapGeoService.currentSelection.subscribe(messageSelection => this.selection = messageSelection)
    this.mapGeoService.currentSelectionLayer.subscribe(messageSelectionLayerSource => this.selectionLayer = messageSelectionLayerSource)
    this.mapGeoService.currentDeletedGeo.subscribe(messageDeletedGeo => {
      this.deletedGeo = messageDeletedGeo
      this.newMessage(messageDeletedGeo)
    })

    this.mapGeoService.currentSelectedCountry.subscribe(messageSelectedCountrySource => {
      this.selectedCountryName = messageSelectedCountrySource;
      console.log('map is changed')
      if (this.selectedCountryName === 'Italy') {
        console.log('create second')
        this.map.setTarget('')
        this.initializeMapSecond()
      }
      if (this.selectedCountryName === '') {
        this.map.setTarget('')
        this.initializeMap();
      } else {
        console.log('there is no map layer yet for chosen country')
      }
    })
    this.mapGeoService.currentDeselectAll.subscribe(messageDeletedGeo => {
      this.deselectAllValue = messageDeletedGeo
      this.deselectAll()
    })
  }

  initializeMapSecond() {
    this.regionBoarder = new TileLayer({
      source: new TileWMS({
        url: 'http://94.130.228.242:8082/geoserver/geosale/wms',
        params: {'LAYERS': 'geosale:ITA_adm1', 'TILED': true},
        serverType: 'geoserver',
      }),
      opacity: 1.0
    });

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'http://94.130.228.242:8082/geoserver/geosale/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geosale%3AITA_adm1&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
      }),
      style: this.country,
      opacity: 0.1 // Already in country
    });

    this.grp = new LayerGroup({
      layers: [this.baseMap, this.vectorLayer, this.regionBoarder],
    });

    this.map = new MAP({
      target: 'map',
      layers: [this.grp],
      view: new View({
        center: [-78906677.036667, 5444438.895],
        zoom: 5
      }),
    });
    // Selection
    this.selectionLayer = new VectorLayer({
      map: this.map,
      source: this.vectorLayer.getSource(),
      style: (feature) => {
        if (feature.getId()! in this.selection) {
          return this.selectedCountry;
        }
      },
    });

    const selectMap = () => {
      return (features) => {
        if (!features.length) {
          this.selection = [];
          this.geoSelected.clear();
          this.newGeo(this.geoSelected)
          this.selectionLayer.changed();
          return;
        }
        const feature = features[0];
        if (!feature) {
          return;
        }

        const fid: any = feature.getId();
        if (fid in this.selection) { // remove double click
          console.log('double click', fid);
          this.geoSelected.delete(fid);
          this.newGeo(this.geoSelected)
          delete this.selection[fid];
          this.selectionLayer.changed();
          return;
        }
        this.geoSelected.add(fid);
        this.newGeo(this.geoSelected)
        this.selection[fid] = feature;
        this.selectionLayer.changed();
      }
    }
    this.map.on('click', (e) => {
      this.vectorLayer.getFeatures(e.pixel).then(selectMap())
    });

    this.geoList = this.geoSelected;
  }

  // baseMap = new Tile({source: new OSM()});
  regionBoarder = new TileLayer({})
  vectorLayer = new VectorLayer({})
  grp = new LayerGroup({
    layers: [this.baseMap],
  });

  initializeMap() {

    // this.regionBoarder = new TileLayer({})
    console.log('new country is : ', this.selectedCountryName)
    this.grp = new LayerGroup({
      layers: [this.baseMap],
    });

    this.map = new MAP({
      target: 'map',
      layers: [this.grp],
      view: new View({
        center: [-78906677.036667, 5444438.895],
        zoom: 5
      }),
    });
    this.geoList = this.geoSelected;
  }

  private newGeo(geoSelected: Set<any>) {
    let ww: GeosName[] = [];
    geoSelected.forEach(geoName =>
      ww.push({no: geoName, name: this.getGeoName(geoName), other: 'bla'}))

    this.mapGeoService.changeMessage(ww)
  }

  onSubmit() {
    console.log('geo to be filtered: ', this.geoList);
    this.service.getGeos(this.geoList);
  }

  message: string;

  deselectAll() {
    console.log('deselect: ')
    this.selection = [];
    this.geoSelected.clear();
    this.newGeo(this.geoSelected)
    this.selectionLayer.changed();
    return;
  }

  newMessage(name2: string) {
    console.log('cam here anme: ', name2)
    if (name2 in this.selection) { // remove double click
      console.log('delete message', name2);
      delete this.selection[name2];
      this.selectionLayer.changed();
      this.geoSelected.delete(name2);
      this.newGeo(this.geoSelected)
      // this.deletedGeo
      return;
    } else {
      console.log('was not in selectyuiolkjhg')
    }
  }

  private getGeoName(geoStringCode: any): string {
    const geoCode: number = geoStringCode.split('.').pop() as number;
    console.log('geoCode', geoCode)
    var geoName: string = ''
    this.regions.filter((region: RegionTo) => {
      if (Number(geoCode) === region.codeGeo) {
        geoName = region.regionName
      }
    })
    console.log('dddd', geoName)

    return geoName;

  }
}
