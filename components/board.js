import Card from './card'
import styles from '../styles/Home.module.css'


export default function Board({title, cards}){

    return(
        <div className={styles.col}>
            <h1>{title}</h1>
            {cards.map(c => {
                <Card
                    link={c.id}
                    player1={c.players}
                    player2={c.players}
                />
            })}
        </div>
    )
}