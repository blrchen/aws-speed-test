import { Component, OnInit } from "@angular/core";
import { Region } from "src/app/models";
import data from "../../../assets/data/regions.json";

@Component({
  selector: "app-regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.scss"],
})
export class RegionsComponent implements OnInit {
  tableData: Region[] = [];

  ngOnInit() {
    this.tableData = data.sort((a, b) => a.geography.localeCompare(b.geography));
  }
}
