import React, { Component } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./Explore.css"
// import { GMap } from 'primereact/gmap';
// import Snackbar from '@material-ui/core/Snackbar';



export default class Explore extends Component {
    constructor() {
        super();
        this.state = {
            start: null,
            end: null,
            message: ""

        };

        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onStartChange(e) {
        this.setState({ start: e.value });
    }

    onEndChange(e) {
        this.setState({ end: e.value });
    }
    handleSubmit() {


        // create an object to post to the database
        const newRoute ={
            name: `${this.state.start.name} to ${this.state.end.name}`,
            userId: parseInt(sessionStorage.getItem("credentials")),
            startId:parseInt(this.state.start.code),
            endId: parseInt(this.state.end.code),
            direction: (parseInt(this.state.start.code)<parseInt(this.state.end.code)?true:false),
            isComplete: false,
            timeToComplete: "",
            dateCompleted:""

        }
        console.log("new Route", newRoute)
        this.setState({message:"Your route was created!"})

        this.props.addRoute("routes", newRoute)

        // post to the database


    }


    render() {
        const options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };



        // Eventually these constants will be populated with info from the database
        const start = [
            { name: 'Wildcat Hollow', code: '1' },
            { name: 'Blue Sulphur Rd', code: '2' },
            { name: 'Camp Arrowhead', code: '3' },
            { name: 'Howells Mill', code: '4' },
            { name: 'Canaan Lands', code: '5' }
        ];

        const end = [
            { name: 'Wildcat Hollow', code: '1' },
            { name: 'Blue Sulphur Rd', code: '2' },
            { name: 'Camp Arrowhead', code: '3' },
            { name: 'Howells Mill', code: '4' },
            { name: 'Canaan Lands', code: '5' }
        ];

        return (

            <div>
                <h2>Build A Route</h2>
                <div className="exp-cont content-section implementation">

                    <div className="exp-left">

                        <div className="exp-dd-cont">
                            <Dropdown className="exp-dd" value={this.state.start} options={start} onChange={this.onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                            <Dropdown className="exp-dd" value={this.state.end} options={end} onChange={this.onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                        </div>

                        <div className="exp-dd-foot">{this.state.start ? 'Selected start: ' + this.state.start.name : 'No start point selected'}</div>
                        <div className="exp-dd-foot">{this.state.end ? 'Selected end: ' + this.state.end.name : 'No end point selected'}</div>

                        <div><Button className="explore-dd-submit-btn" label="submit" icon="pi pi-check" iconPos="right" onClick={this.handleSubmit} /></div>
                    <div className ="exp-msg">{this.state.message}</div>
                    </div>
                    <div className="exp-right">
                        <img src={window.location.origin + "/images/kt_map.jpg"} className="exp-map" />

                        {/* <GMap options={options} style={{ width: '100%', minHeight: '320px' }} /> */}
                    </div>
                </div>
            </div>


        );
    }
}

