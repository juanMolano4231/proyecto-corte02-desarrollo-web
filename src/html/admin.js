import { ParteController } from "../js/partes-cv/parteController.js";

const controllerP = new ParteController();

document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('rol');
    if (role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    const adminName = localStorage.getItem('currentUser') || 'admin';
    document.getElementById('adminName').textContent = adminName;

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rol');
        window.location.href = 'login.html';
    });

    // initial render
    renderTable();

    document.getElementById('statusFilter').addEventListener('change', () => renderTable());
});

function getAllParts() {
    const stored = localStorage.getItem('parts');
    return stored ? JSON.parse(stored) : [];
}

function renderTable() {
    const parts = getAllParts();
    const users = Array.from(new Set(parts.map(p => p.user).filter(Boolean)));

    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    const filter = (document.getElementById('statusFilter')?.value || 'Todos').toLowerCase();

    users.forEach(user => {
        const estadoRecord = parts.find(p => p.user === user && p.cvPart === 0);
        const estado = (estadoRecord && estadoRecord.estado) ? estadoRecord.estado : 'sin estado';
        const fecha = (estadoRecord && estadoRecord.fechaAplicacion) ? new Date(estadoRecord.fechaAplicacion).toLocaleString() : getFirstPartDate(parts, user);

        if (filter !== 'todos' && filter !== 'todos' && filter !== '' ) {
            if (filter !== estado.toLowerCase() && !(filter === 'pendiente' && estado.toLowerCase() === 'pendiente')) return;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user}</td>
            <td>${fecha || ''}</td>
            <td class="estado-cell">${estado}</td>
            <td>
                <button class="btn btn-info btn-sm view-btn">Ver</button>
                <button class="btn btn-success btn-sm approve-btn">Aprobar</button>
                <button class="btn btn-danger btn-sm reject-btn">Rechazar</button>
            </td>
        `;

        tr.querySelector('.view-btn').addEventListener('click', () => showUserDetails(user));
        tr.querySelector('.approve-btn').addEventListener('click', () => setUserEstado(user, 'aceptado'));
        tr.querySelector('.reject-btn').addEventListener('click', () => setUserEstado(user, 'rechazado'));

        tbody.appendChild(tr);
    });
}

function getFirstPartDate(parts, user) {
    const userParts = parts.filter(p => p.user === user && p.cvPart !== 0);
    if (userParts.length === 0) return '';
    const dates = userParts.map(p => p.createdAt || p.updatedAt).filter(Boolean).sort();
    return dates.length ? new Date(dates[0]).toLocaleString() : '';
}

function showUserDetails(user) {
    const parts = getAllParts().filter(p => p.user === user);

    const viewModal = document.getElementById('viewModal');
    const content = document.getElementById('viewContent');
    const pretty = parts
        .sort((a,b) => a.cvPart - b.cvPart)
        .map(p => `Parte ${p.cvPart}: \n${JSON.stringify(p, null, 2)}`)
        .join('\n\n');

    content.textContent = pretty;
    $('#viewModal').modal('show');

    // attach modal approve/reject buttons
    document.getElementById('modalApprove').onclick = () => { setUserEstado(user, 'aceptado'); $('#viewModal').modal('hide'); };
    document.getElementById('modalReject').onclick = () => { setUserEstado(user, 'rechazado'); $('#viewModal').modal('hide'); };
}

function setUserEstado(user, nuevoEstado) {
    const parts = getAllParts();
    const now = new Date().toISOString();
    const index0 = parts.findIndex(p => p.user === user && p.cvPart === 0);
    if (index0 !== -1) {
        parts[index0].estado = nuevoEstado;
        parts[index0].fechaRevision = now;
        parts[index0].revisor = localStorage.getItem('currentUser') || 'admin';
    } else {
        parts.push({ user, cvPart: 0, estado: nuevoEstado, fechaRevision: now, revisor: localStorage.getItem('currentUser') || 'admin' });
    }

    localStorage.setItem('parts', JSON.stringify(parts));
    renderTable();
}
