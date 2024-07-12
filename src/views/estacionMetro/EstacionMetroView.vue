<template>
  <div class="content">
    <div class="header-container">
      <h1>Registro de Estaciones del Metro</h1>
      <div class="user-info">
        <span>Uroos Fatima</span>
        <img src="https://via.placeholder.com/40" alt="User Image">
      </div>
    </div>
    <div class="header">
      <h2>Estaciones del Metro</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar...">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-train"></i> Nombre de la Estación</th>
            <th><i class="fas fa-info-circle"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-info-circle"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 Jan 2022</td>
            <td>Quitumbe</td>
            <td>15 gradas para abajo </td>
            <td>15 gradas para abajo </td>
            <td class="status">Activo</td>
            <td class="actions">
              <i class="fas fa-plus-circle"></i>
              <i class="fas fa-edit"></i>
              <i class="fas fa-trash-alt"></i>
            </td>
          </tr>
          <!-- Repite el bloque <tr>...</tr> para más usuarios -->
        </tbody>
      </table>
      <div class="pagination">
        <p>8 results found: Showing page 1 of 100</p>
        <button>Previous</button>
        <button class="active">1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
  </div>
  </template>

  <style>
    .content {
      margin-left: 50px;
      padding: 20px;
      width: calc(100% - 270px);
    }

    .header {
      background-color: #e0e4e8;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
    }

    .search-box {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 5px 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }

    .search-box input {
      border: none;
      outline: none;
      margin-left: 5px;
    }

    .table-container {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      padding: 15px;
      text-align: left;
    }

    th {
      background-color: #f0f2f5;
      color: #333;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9fafb;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    .actions i {
      margin-right: 10px;
      cursor: pointer;
    }

    .actions i:hover {
      color: #007bff;
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      align-items: center;
    }

    .pagination button {
      background-color: #e0e4e8;
      border: none;
      padding: 10px 15px;
      margin-left: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    .pagination button.active {
      background-color: #007bff;
      color: white;
    }

    .pagination p {
      margin: 0;
      margin-right: auto;
      color: #666;
    }

    .status {
      color: #28a745;
      font-weight: bold;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #d1d8dd;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-container h1 {
      margin: 0;
      font-size: 24px;
    }
  </style>
  