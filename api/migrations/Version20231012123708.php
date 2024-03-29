<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231012123708 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4E977E5C6C6E55B5 ON salle (nom)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4E977E5CF55AE19E ON salle (numero)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_4E977E5C6C6E55B5 ON salle');
        $this->addSql('DROP INDEX UNIQ_4E977E5CF55AE19E ON salle');
    }
}
