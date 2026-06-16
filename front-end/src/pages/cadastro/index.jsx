import { useState } from 'react'
import './style.css'

function Cadastro() {
  const [hasRA, setHasRA] = useState(false)
  const [ra, setRa] = useState("")

  return (
    <>
      <main>
        <div id="registration">
          <h1>CADASTRO</h1>
          <form>
            <div id="nameForm">
              <label>Nome:
                <br />
                <input id="Name" type="text" placeholder="Nome" />
              </label>
            </div>
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
            <div id="passwordConfirmForm">
              <label>Confirmar Senha:
                <br />
                <input id="Passsword" type="password" placeholder="Senha" />
              </label>
            </div>
            <div id="hasRA">
              <label>
                <input
                  id="raCheckbox"
                  type="checkbox"
                  checked={hasRA}
                  onChange={() => {
                    setHasRA(!hasRA)
                    if (hasRA) {
                      setRa("")
                    }
                  }}
                /> Possui R.A?
                <br />
                <input id="raInput"
                  type="text"
                  placeholder="Ex: 1234567"
                  disabled={!hasRA}
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                />
              </label>
            </div>
            <div>
              <button id="formButton" type="submit">CADASTRAR</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Cadastro
