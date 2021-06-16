import React from "react";
import "./Header1.css";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useHistory } from "react-router-dom";

function Header1({ backButton }) {
  const history = useHistory();
  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon className="header__icon" fontSize="large" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
      )}
      <Link to="/">
        <img
          className="header__logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACZmZn39/eUlJQxMTFRUVFbW1uwsLBfX1/BwcE3NzcpKSnt7e3z8/NkZGSgoKCmpqZ5eXlubm5OTk6Ojo5zc3NWVlbGxsa5ubng4OAYGBhsbGwhISFHR0cNDQ2FhYXT09M+Pj4WFhaAgIDc3Nyp3U5qAAADyElEQVR4nO3Y7WKiOBiGYaK2ShUQVPxWsO75n+LyhoQEtbOzrlo6e19/CAFCHpAQDAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0i7oQf3eHHo6EPx8Jf77/X8L+d3fo4Vy2MJ1Weo3BxZ6DLMvX39LH/8YlnOr1yZe3c15VXab2ZUkSrp7X0bu5QD29/vZlwvd/SChHjp7X0bs9LuGYhN/kcQlP1fYujkT3JBzsZslHEPTkrpnBJQ7zbbU2z2ezpKx32VVxN/ln3Uw5CMfb4+R9EPlNRoNDddA28S5MPJUR7TN0v4Yyme2yIFgNq/rT9DUJl1Upjfdmt0x3zB2mb+RQ75yaZkZbt/XsWlw0ldvSVA3azYiPqrwPclO7b12iZyWU7vf2rQMvE4bVcrqyzYy8rSq0DR782tF1VeESnoqmdvKqhOJkUsa3Ey6Otpm+LLdvez+Mbk+pQ5boZSJV87rZfFcfuWgSivG4XqYvS1g9icFm4rrcGksloXRzvNAdSopSWuun7i7o4lz/5tZKDWXZk6ph5GKVrljIhcr0BXhVwvrJiaSY3U7Y7OTRv9fInvjd1Ea6oO/0zlbpG9wkzOtaGQHUixLOTe1OmRtwK+GNDxWpluF3fb09bXVfB9vYghlfVl752Qntm3Ha3IrrhN77P14vqjG/99Gfm9935t0vQx7Iwq1+qvqZk4Sfpi56YUL7vKe/SOiOzZRPEp7U1ZixN5uM3ASWhHYAjV+Y0L56f5Fw2RzqfbDYhJN2HNsV7+NE3pZZtxMWdkW/rQ/parUezG3CG7PYbTv0ufv30D6qeoy0K4mJISNU3j7BUrWewzflnsOOJuyZcimN+TEk4ej6DD1/v/ooO5Z2J2EzdvgJV37P7a9U97WZwOVyLj1QJrZKOqJf7t1JKI/YWHoRXSTcSGOlS14/bHraHepzbMZqL4WzropNlfLmNN1IqPunlgc9HvoJAz3LnEb9zageVD+8MyWLQo8+R6mqN4emShVBtxKW9rirhGvX5vGtSRi7rxNlvpXaVfVk8IUJ3X9ty4uEZgZnX+uroD3tqSc+dcDooNwrYeeC2wls7k5vR636+/D+hO7/Ufm3dJp6V/EiYREm5st7UZWa79NhEhamvJbun1K7i/e622RHs+mcJMNmPv7XWaZmau7vWegeHNx8pxwmycyU+1V5efff8q3P1BsJf8vXx/Tjm9vi6KrD/ehff8f/nock7DQS/nwk/Pn+/IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4jr8BsVktjaQgvmkAAAAASUVORK5CYII="
          alt="tinder logo"
        />
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}

export default Header1;
