<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231017195649 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE session_cours ADD professeur_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE session_cours ADD CONSTRAINT FK_26B7344ABAB22EE9 FOREIGN KEY (professeur_id) REFERENCES professeur (id)');
        $this->addSql('CREATE INDEX IDX_26B7344ABAB22EE9 ON session_cours (professeur_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE session_cours DROP FOREIGN KEY FK_26B7344ABAB22EE9');
        $this->addSql('DROP INDEX IDX_26B7344ABAB22EE9 ON session_cours');
        $this->addSql('ALTER TABLE session_cours DROP professeur_id');
    }
}
