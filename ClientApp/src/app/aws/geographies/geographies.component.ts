import { Component, OnInit } from "@angular/core";
import data from "../../../assets/data/geographies.json";

@Component({
  selector: "app-geographies",
  templateUrl: "./geographies.component.html",
  styleUrls: ["./geographies.component.scss"],
})
export class GeographiesComponent implements OnInit {
  tableData: any = [];

  ngOnInit() {
    console.log("data = ", data);
    this.tableData = data;
  }
}
