-- AlterTable
ALTER TABLE `devices` MODIFY `tipo` ENUM('estoque', 'pdv', 'admin', 'financeiro', 'rh', 'totem', 'terminal_preco', 'pc_financeiro', 'pc_rh', 'pc_gerencia', 'pc_atendimento', 'outro') NULL DEFAULT 'outro';
