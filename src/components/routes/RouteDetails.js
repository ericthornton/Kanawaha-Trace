import React, { Component } from "react";
import Moment from 'react-moment';
import "./Routes.css"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import CompleteRoutePatch from "./CompleteRoutePatch"
import { Dropdown } from 'primereact/dropdown';
import ResourceManager from "../../modules/ResourceAPIManager"

export default class RouteDetails extends Component {

    componentDidMount() {
        ResourceManager.getSingleItem("routes", this.props.match.params.routeId)
        .then(route => {
          this.setState({
            name: route.name,
            userId: route.userId,
            startId: route.startId,
            endId: route.endId,
            direction: route.direction,
            isComplete: route.isComplete,
            timeToComplete: route.timeToComplete,
            dateCompleted: route.dateCompleted,
            id: route.id
          });
        });
      }

    constructor() {
        super();
        this.state = {
            visible: false,
            activeUser: parseInt(sessionStorage.getItem("credentials")),
            date: "",
            time: "",
            start:"",
            end:"",
            target: ""
        };
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }
    onClick(event) {
        this.setState({ visible: true });
    }

    onHide(event) {
        this.setState({ visible: false });
    }

    completeRoute() {
        const routeId = this.state.id
        const patchObject = CompleteRoutePatch(this.state)
        this.props.patchRoute("routes", routeId, patchObject, this.state.activeUser)
    }

    footer() {
        return (
            <React.Fragment>
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.completeRoute()
                    }}
                />
            </div>
            </React.Fragment>
        )
    }

    completeRouteFragment(footer) {
        return (
            <React.Fragment>
                <Dialog header="Route Completed" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >
                    <div>Date Completed:
                <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} ></Calendar>
                    </div>
                    <div>Time to Complete:
                <InputText value={this.state.time} onChange={(e) => this.setState({ time: e.target.value })} />
                    </div>
                </Dialog>

            </React.Fragment >
        )
    }

    editRouteFragment(footer) {
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
            <React.Fragment>
                <Dialog header="Edit Start and End Points" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} >

                    <div className="exp-dd-cont">
                        <Dropdown className="exp-dd" value={this.state.start} options={start} onChange={this.onStartChange} style={{ width: '200px' }} placeholder="Select a Start Point" optionLabel="name" />
                        <Dropdown className="exp-dd" value={this.state.end} options={end} onChange={this.onEndChange} style={{ width: '200px' }} placeholder="Select an End Point" optionLabel="name" />
                    </div>
                </Dialog>


            </React.Fragment>
        )
    }

    render() {
        const footer = (
            <div>
                <Button label="Submit" className="p-button-success" icon="pi pi-check"
                    onClick={() => {
                        this.onHide()
                        this.completeRoute()
                    }}
                />
            </div>
        )


        /*
                   Using the route parameter, find the route that the
                   user clicked on by looking at the `this.props.routes`
                   collection that was passed down from ApplicationViews
               */
        const route = this.props.routes.find(a => a.id === parseInt(this.props.match.params.routeId)) || {}
        const routeDate = <Moment format="MM/DD/YY">{route.dateCompleted}</Moment>

        return (<React.Fragment>
            <div className="route-card-header">
                {(route.direction === true ?
                    <img src={window.location.origin + "/images/west_east.jpg"} height="80px" className="route-marker" /> :
                    <img src={window.location.origin + "/images/east_west.jpg"} height="80px" className="route-marker" />
                )}
                <span className="route-name-details-header">{route.name}</span>
            </div>
            <div className="details-body-container">
                <div className="route-details-img-cont">
                    <img src={window.location.origin + "/images/section_map.jpg"} height="400px" className="exp-map" />
                </div>

                <div className="route-text-detail-cont">
                    {(route.isComplete === true ?
                        <React.Fragment>
                            <p className="route-detail-text">Date Completed: {routeDate}</p>
                            <p className="route-detail-text">Time to Complete: {route.timeToComplete}</p>
                        </React.Fragment> : "")}
                    <p className="route-detail-text">Elevation Gain: </p>
                    <p className="route-detail-text">Mileage: </p>
                    <p className="route-detail-text">Hazards: </p>
                    <p className="route-detail-text">Features: </p>
                </div>


            </div>


            <div className="route-details-btn-cont">

                <Button label={route.isComplete === false ? "Complete" : "Edit"}
                    icon={(route.isComplete === false ? "pi pi-check" : "pi pi-pencil")}
                    id="complete-route"
                    iconPos="right"
                    className={(route.isComplete === false ? "p-button-raised p-button-rounded p-button-success" :
                        "p-button-raised p-button-rounded p-button-primary")}
                    onClick={(e) => this.setState({
                        visible: true,
                        target: e.currentTarget.id,
                    })} />


                {route.isComplete === false ? <Button label="Edit" icon="pi pi-pencil"
                    id="edit-route-detail"
                    iconPos="right"
                    className="p-button-raised p-button-rounded p-button-primary"
                    onClick={(e) =>
                        this.setState({
                            visible: true,
                            target: e.currentTarget.id,
                        })
                    } />:""}
                    <Button label="Delete"
                        icon="pi pi-trash" iconPos="right"
                        className="p-button-raised p-button-rounded p-button-danger"
                        onClick={() => {
                            this.props.deleteRoute("routes", route.id, this.state.userId)
                        }} />
            </div>




                {(this.state.target === "complete-route"?
                    this.completeRouteFragment(footer) : "")}

                {(this.state.target === "edit-route-detail" ?
                    this.editRouteFragment(footer) : "")}




        </React.Fragment>)





            }
        }


