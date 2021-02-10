import Card from './card'
import styles from '../styles/Home.module.css'


export default function Board({title, cards}){

    return(
        <div className={styles.col}>
            <h1>{title}</h1>
            <Card link='https://lichess.org/574849' player1='hi' player2='hi'></Card>
            <Card></Card>
        </div>
    )
}