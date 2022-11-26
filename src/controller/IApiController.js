import React from "react";

class IApiController extends React.Component {
    async Get(uri) {
        let json = await fetch(uri, {
            method: 'GET',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json());

        return json;
    }
    async Post(uri, body) {
        let json = await fetch(uri, {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then(res => res.json());

        return json;
    }
}

export default IApiController;