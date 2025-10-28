// pages/api/v1/status.js
import database from "infra/database";

async function status(request, response) {
  // Adiciona o try...catch aqui
  try {
    const updated_at = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
      "SHOW max_connections;",
    );
    const databaseMaxConnectionsValue =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;

    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    const databaseOpenedConnectionsValue =
      databaseOpenedConnectionsResult.rows[0].count;

    // Se tudo deu certo, envia a resposta 200 OK
    response.status(200).json({
      updated_at: updated_at,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    });
  } catch (error) {
    // Se qualquer "await" acima falhar, ele pula para cá
    console.error("Erro detalhado:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      detail: error.detail,
    });
    // Envia uma resposta de erro 500
    response.status(500).json({
      error: "Ops, algo deu errado no servidor.",
      detail: error.message,
    });
  }
}

export default status;
