import { Pool } from "pg";

// Criamos um único pool para todo o aplicativo
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.NODE.ENV == "development" ? false : true,

  // Configurações do pool
  max: 20, // máximo de conexões (padrão: 10)
  min: 1, // mínimo de conexões mantidas prontas
  idleTimeoutMillis: 30000, // tempo máximo que uma conexão pode ficar ociosa
  connectionTimeoutMillis: 2000, // tempo máximo para conseguir uma conexão
});

// Monitora erros no pool
pool.on("error", (err) => {
  console.error("Erro inesperado no pool do postgres:", err);
});

async function query(queryObject) {
  const client = await pool.connect();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Erro ao executar query:", error);
    throw error;
  } finally {
    // Libera o client de volta para o pool (não fecha a conexão)
    client.release();
  }
}

// Função para fechar o pool (útil para testes e desligamento gracioso)
async function end() {
  await pool.end();
}

export default {
  query,
  end, // Exportamos end() para poder fechar o pool quando necessário
};
