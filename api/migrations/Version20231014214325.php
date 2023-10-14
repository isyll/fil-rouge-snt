<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231014214325 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE session_cours ADD salle_id INT DEFAULT NULL, CHANGE duree duree VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE session_cours ADD CONSTRAINT FK_26B7344ADC304035 FOREIGN KEY (salle_id) REFERENCES salle (id)');
        $this->addSql('CREATE INDEX IDX_26B7344ADC304035 ON session_cours (salle_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE session_cours DROP FOREIGN KEY FK_26B7344ADC304035');
        $this->addSql('DROP INDEX IDX_26B7344ADC304035 ON session_cours');
        $this->addSql('ALTER TABLE session_cours DROP salle_id, CHANGE duree duree TIME DEFAULT NULL');
    }
}
