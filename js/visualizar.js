// Função para visualizar o usuário
async function visualizarUsuario(userId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/api/user/visualizar/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const usuario = await response.json();
            alert(`
                Nome: ${usuario.name}
                Email: ${usuario.email}
                Data de Criação: ${new Date(usuario.created_at).toLocaleString('pt-BR')}
            `); // Exibe as informações do usuário em um alerta
        } else {
            throw new Error('Erro ao visualizar o usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao visualizar o usuário.');
    }
}

// Adiciona o evento de clique para visualizar o usuário
document.querySelectorAll('.visualizar-usuario').forEach(button => {
    button.addEventListener('click', async function () {
        const userId = this.getAttribute('data-id');
        visualizarUsuario(userId);
    });
});
