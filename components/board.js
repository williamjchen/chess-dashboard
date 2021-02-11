import Card from './card'
import styles from '../styles/Home.module.css'


export default function Board({title, cards}){

    return(
        <div className={styles.col}>
            <h1>{title}</h1>
            {cards.map((c, index) => {
                return(<Card
                    link={c.link}
                    key={index}
                    player1={c.white}
                    player2={c.black}
                />)
            })}
        </div>
    )
}