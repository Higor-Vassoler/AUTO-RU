import { useState } from 'react'
import './style.css'

function Login() {
  const [StayLogged, setStayLogged] = useState(false)

  return (
    <>
      <main>
        <div id="login">
          <h1>Entrar</h1>
          <form>
            <div id="emailForm">
              <label>E-mail:
                <br />
                <input id="Email" type="email" placeholder="E-mail" />
              </label>
            </div>
            <div id="passwordForm">
              <label>Senha:
                <br />
                <input id="Password" type="password" placeholder="Senha" />
              </label>
            </div>
            <div id="StayLoggedDiv">
              <label>
                <input
                  id="StayLoggedCheckbox"
                  type="checkbox"
                  checked={StayLogged}
                  onChange={() => {
                    setStayLogged(!StayLogged)
                  }}
                /> Continuar logado?
              </label>
            </div>
            <div>
              <button id="formButton" type="submit">ENTRAR</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login
