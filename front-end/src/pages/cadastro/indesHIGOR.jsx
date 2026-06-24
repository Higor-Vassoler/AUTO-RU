import { useState } from 'react'
import './style.css'

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState(""); // Adicionado estado
    const [hasRA, setHasRA] = useState(false)
    const [ra, setRa] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem!")
            return;
        }

        const dadosUsuario = {
            nome: nome,
            email: email,
            senha: senha,
            ra: hasRA ? ra : null
        };

        try {
            const resposta = await fetch("http://localhost:5000/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosUsuario)
            });

            const dadosResposta = await resposta.json();

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!");
                console.log("Sucesso:", dadosResposta);
            } else {
                alert(`Erro: ${dadosResposta.erro || "Falha ao cadastrar"}`);
            }
        } catch (erro) {
            console.error(`Erro ao conectar com o back-end: ${erro}`);
        }
    };

    return (
        <>
            <main>
                <div id="registration">
                    <h1>CADASTRO</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Exemplo de como vincular o input ao estado */}
                        <div id="nameForm">
                            <label>Nome:
                                <br />
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div id="emailForm">
                            <label>E-mail:
                                <br />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div id="passwordForm">
                            <label>Senha:
                                <br />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div id="passwordConfirmForm">
                            <label>Confirmar Senha:
                                <br />
                                <input
                                    type="password"
                                    placeholder="Confirme a senha"
                                    value={confirmaSenha}
                                    onChange={(e) => setConfirmaSenha(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div id="hasRA">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={hasRA}
                                    onChange={() => setHasRA(!hasRA)}
                                /> Possui R.A?
                                <br />
                                <input
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
