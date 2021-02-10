import styles from '../styles/Home.module.css'

export default function Card({link, player1, player2}){
    return (
        <div className={styles.card}>
            <a href={link} target='blank'><h3>{link}</h3></a>
            <ul>
                <li>{player1}</li>
                <li>{player2}</li>
            </ul>
        </div>
)
}