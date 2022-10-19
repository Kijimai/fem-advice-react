import React, { useState, useEffect } from "react"
import axios from "axios"
import dividerDesktop from "../assets/images/pattern-divider-desktop.svg"
import dividerMobile from "../assets/images/pattern-divider-mobile.svg"
import diceImg from "../assets/images/icon-dice.svg"
const endpoint_url = "https://api.adviceslip.com/advice"

const Advice = () => {
  const [adviceObj, setAdvice] = useState({ id: null, adv: null })
  const [loading, setLoading] = useState(false)

  const getAdvice = async () => {
    try {
      setLoading(true)
      const res = await axios.get(endpoint_url)
      const { id, advice } = res.data.slip
      setAdvice({ id, adv: advice })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => getAdvice, [])

  return (
    <article className="advice">
      <h1 className="advice__counter">
        Advice #{adviceObj ? adviceObj.id : "N/A"}
      </h1>
      <p className="advice__text">
        {loading ? "Loading..." : adviceObj && adviceObj.adv}
      </p>
      <img
        className="advice__divider-desktop"
        src={dividerDesktop}
        alt="divider"
      />
      <img
        className="advice__divider-mobile"
        src={dividerMobile}
        alt="divider"
      />
      <button className="advice__button" onClick={getAdvice}>
        <img src={diceImg} alt="dice advice reroll button" />
      </button>
    </article>
  )
}

export default Advice
