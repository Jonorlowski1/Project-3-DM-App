import React from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from 'react-bulma-components';


function NavTabs(props) {
    return (
        <Tabs type='toggle' fullwidth={true}>
            <Tabs.Tab renderAs="div">
                <NavLink style={{ fontSize: 'calc(100% + 0.8vw)', fontWeight: '600', textDecoration: 'underline' }} to={{
                    pathname: '/initadmin',
                    state: {
                        game_id: props.game_id,
                        secret: props.secret,
                        game_name: props.game_name
                    }
                }} activeClassName="is-active">
                    Initiative
                 </NavLink>
            </Tabs.Tab>
            <Tabs.Tab renderAs="div">

                <NavLink style={{ fontSize: 'calc(100% + 0.8vw)', fontWeight: '600', textDecoration: 'underline' }} to={{
                    pathname: '/hue',
                    state: {
                        game_id: props.game_id,
                        secret: props.secret,
                        game_name: props.game_name
                    }
                }} activeClassName="is-active">
                    Philips Hue
                </NavLink>
            </Tabs.Tab>
        </Tabs >
    );
}

export default NavTabs;
