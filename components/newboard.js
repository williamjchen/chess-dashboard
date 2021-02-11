import Card from './card'
import Game from './game'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import axios from 'axios'


export default function Board({title, cards, addCard}){

    const [value, setValue] = useState('')

    const addGame = event => {
        event.preventDefault();
        if(value.includes('https://lichess.org/') && cards.filter(c => c.link === value).length === 0){
            const card = new Game(value)
            addCard(cards.concat(card))
        }
        setValue('')
    }

    const handleChange = event => {
        setValue(event.target.value)
    }

    return(
        <div className={styles.col}>
            <h1>{title}</h1>

            <form onSubmit={addGame} style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column'}}>
                <input type='text' value={value} onChange={handleChange} className={styles.input} placeholder={'https://lichess.org/linkhere'}/>
                <button className={styles.button} type='submit'>
                    <h3>Add Game</h3>
                </button>
            </form>
            
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
