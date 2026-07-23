const express = require("express");
const controller = require("../controllers/matriculaController");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.obterPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

module.exports = router;