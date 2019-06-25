import React from "react";

import "./css/Header.css";

function Header(props) {
    return (
        <header id="desktop-header">
            <h1 id="desktop-page-title">A Reddit Alt</h1>
            <form id="desktop-search-form">
                <input value={props.subReddit}
                    id="desktop-search-bar"
                    name="subReddit"
                    onChange={props.handleInputChange}
                    type="text"
                    placeholder="subreddit to search for">
                </input>
                <button id="desktop-search-btn" onClick={props.handleFormSubmit}>go</button>

            </form>
        </header >
    )
}

export default Header;