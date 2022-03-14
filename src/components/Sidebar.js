import {Component, useState} from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {useDispatch} from "react-redux";
import {createCoord} from "../features/coodinates";

const TOKEN = "pk.eyJ1IjoidmFsa3lyaWVoZCIsImEiOiJja3ptdWJiZTUycnNmMnBucmU0MzY2NmFyIn0.QmEpWbiE8LqQdRxMmHs0oA";
function getApiURL(input) {
    return "https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=" + TOKEN
}

async function loadOptions(value) {
    if(value == null || value == '') {
        return [];
    }
    const response = await fetch(getApiURL(value), {
        "method": "GET",
        "headers": {
            "access_token": TOKEN,
            "content-type": "application/json",
            "accept": "application/json"
        }});
    const data = await response.json();
    let options = [];
    if(data) {
        if(data.features) {
            data.features.forEach(place => {
                options.push({value: place.center, label: place.place_name});
            })
        }
    }
    return options;
};

export class InputAddresseGeocode extends Component {
    state = {
        inputValue: '',
        options: [],
        isLoading: false,
    }

    handleInputChange = async (inputValue, { action }) => {
        this.setState({ isLoading: true })
        if (action === 'set-value') {
            const options = await loadOptions(this.state.inputValue)
            this.setState({ options, isLoading: false })
        } else {
            this.setState({ inputValue })
            const options = await loadOptions(inputValue)
            this.setState({ options, isLoading: false })
        }
    }

    handleSelectOption = (event) => {
        this.props.valueSelectedCall(event);
    }

    render() {
        return (
        <div className="form-group">
            <label>{this.props.label}</label>
            <Select
                onChange={this.handleSelectOption}
                placeholder={this.props.placeholder}
                inputValue={this.state.inputValue}
                onInputChange={this.handleInputChange}
                options={this.state.options}
                isLoading={this.state.isLoading}
            />
        </div>
    )}
}

function IntputNavigtion() {
    const dispatch = useDispatch();

    function handleStartPoint(event) {
        console.log(event);
        dispatch(createCoord({ startPointLat: event.value[0], startPointLong: event.value[1]}))
    }
    return (
        <div>
            <form>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Choisir un modèle de voiture</option>
                    <option value="1">Telsa Model 3</option>
                    <option value="2">Zoe</option>
                </select>
                <hr />
                <InputAddresseGeocode
                    label="Point de départ"
                    placeholder="Entrer un point de départ"
                    valueSelectedCall={handleStartPoint}
                ></InputAddresseGeocode>
                <InputAddresseGeocode label="Point d'arrivé" placeholder="Entrer une addresse d'arrivé"></InputAddresseGeocode>
            </form>

            <button className="btn btn-primary mt-2">
                Calculer
            </button>
        </div>
    );
}

function SideBar() {
    const [toggled, setToggled] = useState('toggled');
    function toggleSideBar() {
        if(toggled == 'toggled') setToggled('hide')
        else setToggled('toggled')
    }

    function handleStartUpdate() {

    }

    function handleEndUpdate() {

    }

    return (
        <main>
            <button className={'btn btn-primary button-toggle button-toggle-' + toggled} onClick={toggleSideBar}><i className="fa fa-solid fa-bars"></i></button>
            <div id="wrapper" className={'d-flex flex-column flex-shrink-0 p-3 bg-light ' + toggled} style={{width: '360px', position: 'fixed', zIndex: '1',
                height: '100%', right: '0', top: '0'}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4">Navigation</span>
                </a>
                <hr />
                <IntputNavigtion />
            </div>
        </main>
    );
}

export default SideBar;