const UserQueriesList = ({ usuarios, Loading }) => {
    if (Loading) return <div>Loading...</div>;

    return (
        <div className="user-page">
            <div className="user-header">
                <h2>Lista de Usuarios ({usuarios.length})</h2>
            </div>
            <div className="user-list">
                {usuarios.length === 0 ? (
                    <p>No hay usuarios disponibles.</p>
                ) : (
                    usuarios.map((usuario) => {
                        
                        const hiddenPassword = "*".repeat(usuario.password?.length || 0);

                        return (
                            <div key={usuario.id} className="user-item">
                                <p><strong>ID:</strong> {usuario.id}</p>
                                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                                <p><strong>Edad:</strong> {usuario.edad}</p>
                                <p><strong>Email:</strong> {usuario.email}</p>
                                <p><strong>Username:</strong> {usuario.username}</p>
                                <p><strong>Password:</strong> {hiddenPassword}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default UserQueriesList;
