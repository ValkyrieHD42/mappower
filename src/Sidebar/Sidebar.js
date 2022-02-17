import {useState} from "react";
import {Form} from "react-bootstrap";

function IntputNavigtion() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Point de départ</Form.Label>
                <Form.Control type="search" placeholder="Entrer une addresse de départ" value={start} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Point de départ</Form.Label>
                <Form.Control type="search" placeholder="Entrer une addresse de départ" value={end} />
            </Form.Group>

            <button className="btn btn-primary" onClick={console.log(start, end)} type="submit">
                Calculer
            </button>
        </Form>
    );
}

function SideBar() {
    const [toggled, setToggled] = useState('toggled');
    function toggleSideBar() {
        if(toggled == 'toggled') setToggled('hide')
        else setToggled('toggled')
    }

    return (
        <main>
            <button className={'btn btn-primary button-toggle button-toggle-' + toggled} onClick={toggleSideBar}><i className="fa fa-solid fa-bars"></i></button>
            <div id="wrapper" className={'d-flex flex-column flex-shrink-0 p-3 bg-light ' + toggled} style={{width: '280px', position: 'fixed', zIndex: '1',
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