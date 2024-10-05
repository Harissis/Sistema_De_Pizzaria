document.addEventListener("DOMContentLoaded", function() {
    const tabelaUsuarios = document.getElementById('tabelaUsuarios');
    const mensagemErro = document.getElementById('mensagemErro');
    const token = localStorage.getItem('token');

    // Função para listar usuários
    function listarUsuarios() {
        fetch('http://localhost:8000/api/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // Inclui o token de autenticação
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a lista de usuários');
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                data.forEach((usuario, index) => {
                    const row = tabelaUsuarios.insertRow();
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${usuario.name}</td>
                        <td>${usuario.email}</td>
                        <td>${new Date(usuario.created_at).toLocaleDateString('pt-BR')}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deletarUsuario(${usuario.id})">Excluir</button>
                        </td>
                    `;
                });
            } else {
                mensagemErro.classList.remove('d-none');
                mensagemErro.textContent = 'Nenhum usuário encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            mensagemErro.classList.remove('d-none');
            mensagemErro.textContent = 'Erro ao carregar os usuários. Tente novamente.';
        });
    }

    // Chama a função para listar usuários quando a página carregar
    listarUsuarios();
});
