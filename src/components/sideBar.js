import React, { Component } from "react";

class Sidebar extends Component {
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }
  sidebardata() {
      return (
        <div class="pt-5">
          <a href="/add-employee">Add Employee</a>
          <a href="/view-employee">View Employee</a>
          <a href="/modify-employee">Modify Employee</a>
          <a href="/add-department">Add Department</a>
          <a href="/view-department">View Department</a>
          <a href="/modify-department">Modify Department</a>
        </div>
      );
    
  }
  render() {
    return (
      <div>
        <div id="mySidebar" class="sidebar">
          <div type="button" class="closebtn pt-5" onClick={this.closeNav}>
            ×
          </div>
          {this.sidebardata()}
        </div>

        <button class="openbtn" id="btn-nav" onClick={this.openNav}>
          ☰
        </button>
      </div>
    );
  }
}

export default Sidebar;
