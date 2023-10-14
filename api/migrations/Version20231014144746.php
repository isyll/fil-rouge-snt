<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231014144746 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_FDCA8C9CAFC2B5919331C74171688FBC ON cours');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FDCA8C9CAFC2B5919331C74171688FBC8F5EA509 ON cours (module_id, annee_scolaire_id, semestre, classe_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_FDCA8C9CAFC2B5919331C74171688FBC8F5EA509 ON cours');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FDCA8C9CAFC2B5919331C74171688FBC ON cours (module_id, annee_scolaire_id, semestre)');
    }
}
