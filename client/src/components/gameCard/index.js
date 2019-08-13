import React from 'react';
import { Card, Media, Heading, Content } from 'react-bulma-components';
import MyButton from '../buttons';
import { Link } from 'react-router-dom';

const GameCard = (props) => {
    const checkForAdmin = () => {
        if (props.admin) {
            return (<Card.Footer.Item>
                <Link to={{
                    pathname: '/initadmin',
                    state: {
                        game_id: props.id,
                        secret: props.secret,
                        game_name: props.name,
                        admin: props.admin
                    }
                }}>
                    <MyButton static={true} text="Join Game" primary={true}>
                    </MyButton>
                </Link>
            </Card.Footer.Item>
            )
        }
        else {
            return ((<Card.Footer.Item>
                <Link to={{
                    pathname: '/init',
                    state: {
                        game_id: props.id,
                        secret: props.secret,
                        game_name: props.name,
                        admin: props.admin
                    }
                }}>
                    <MyButton static={true} text="Join Game" primary={true}>
                    </MyButton>
                </Link>
            </Card.Footer.Item>))
        }
    }

    return (
        <Card>
            <Card.Content>
                <Media>
                    <Media.Item>
                        <Heading className="title-1 title-2 gameName" size={3}>{props.name}</Heading>
                    </Media.Item>
                </Media>
                <Content>
                    <Heading size={6}>Secret: {props.secret}</Heading>
                </Content>
            </Card.Content>
            <Card.Footer>
                {checkForAdmin()}
                <Card.Footer.Item>
                    <MyButton primary={false} text="Remove Game" onClick={() => props.removeGame(props.user_id, props.secret)}></MyButton>
                </Card.Footer.Item>
            </Card.Footer>
        </Card>
    );
}

export default GameCard;