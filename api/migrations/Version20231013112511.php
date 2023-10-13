<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231013112511 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_717E22E312B2DC9C ON etudiant (matricule)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_17A5529912B2DC9C ON professeur (matricule)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_717E22E312B2DC9C ON etudiant');
        $this->addSql('DROP INDEX UNIQ_17A5529912B2DC9C ON professeur');
    }
}
