import React, { Component } from 'react';
import './App.css';
import JadwalComponent from '../Views/DetailComponent.jsx';
import MenuApp from '../Elements/MenuAppBar'; 
import ProgressBar from '../Elements/ProgresBar'

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          senin :[],
          selasa :[],
          rabu :[],
          kamis :[],
          jumat: [],
          loading : true,
          open : false,
          anchorEl: null,
          openDialog : false,
          openDrawer : false,
          auth : true,
        };
      }

      componentDidMount(){

        //this.props.match.params = menarik nilai variabel path dari page sebelumnya
      
       fetch("http://localhost:4001/api/getJadwalHari/senin")
        .then(response => response.json())
        .then(json => {
          this.setState({
            senin: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalHari/selasa" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            selasa: json.response
          });
        });
        
        fetch("http://localhost:4001/api/getJadwalHari/rabu" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            rabu: json.response
          });
        });
           
        fetch("http://localhost:4001/api/getJadwalhari/kamis" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            kamis: json.response
          });
        });

        
        fetch("http://localhost:4001/api/getJadwalHari/jumat" )
        .then(response => response.json())
        .then(json => {
          this.setState({
            jumat: json.response,
            loading : false
          });
        });
        
      }

      handleClickOpen = () => {
        this.setState({ 
            open: true,
           });
        };
    
      handleClose = () => {
        this.setState({ 
          open: false, 
        });
      };

       // App barr Handle
      
       handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleProfil = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleCloseProfil = () => {
        this.setState({ anchorEl: null });
      };
    
      handleDrawerOpen = () => {
        this.setState({ openDrawer: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ openDrawer: false });
      };

    render() {

      const openProf = Boolean(this.state.anchorEl);
      if(this.state.loading){
        return(
          <div className="App">
        <MenuApp
              Actor =  {this.props.location.state.Actor}
              open = {this.state.openDrawer}
              handleCloseProfil = {this.handleCloseProfil}
              handleMenu = {this.handleProfil}
              handleDrawerOpen = {this.handleDrawerOpen}
              handleDrawerClose = {this.handleDrawerClose}
              auth = {this.state.auth}
              anchorEl = {this.state.anchorEl}
              openProf = {openProf}
              handleChange = {this.handleChange}>
              </MenuApp>
        <ProgressBar open = {this.props.openDrawer}></ProgressBar>
        </div>
        )
      }
      else{
        //console.log(this.props.params.ruangan);
        return (
        <div className="App">
            <MenuApp
                Actor  = {this.props.location.state.Actor}
                open = {this.state.openDrawer}
                handleCloseProfil = {this.handleCloseProfil}
                handleMenu = {this.handleProfil}
                handleDrawerOpen = {this.handleDrawerOpen}
                handleDrawerClose = {this.handleDrawerClose}
                auth = {this.state.auth}
                anchorEl = {this.state.anchorEl}
                openProf = {openProf}
                handleChange = {this.handleChange}></MenuApp>
            <JadwalComponent
              pesanClick = {this.handleClickOpen}
              Actor  = {this.props.location.state.Actor}
              openDrawer = {this.state.openDrawer}
              kd_ruang = "Semester Ganjil 2018 - 2019"
              senin = {this.state.senin}
              selasa = {this.state.selasa}
              rabu ={this.state.rabu}
              kamis ={this.state.kamis}
              jumat ={this.state.jumat}
            ></JadwalComponent>
        </div>
        );
    }
  }
}

export default MainMenu;
