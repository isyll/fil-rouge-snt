<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231018133523 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE presence (id INT AUTO_INCREMENT NOT NULL, session_cours_id INT DEFAULT NULL, etudiant_id INT DEFAULT NULL, present TINYINT(1) NOT NULL, INDEX IDX_6977C7A5F56318D8 (session_cours_id), INDEX IDX_6977C7A5DDEAB1A3 (etudiant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE presence ADD CONSTRAINT FK_6977C7A5F56318D8 FOREIGN KEY (session_cours_id) REFERENCES session_cours (id)');
        $this->addSql('ALTER TABLE presence ADD CONSTRAINT FK_6977C7A5DDEAB1A3 FOREIGN KEY (etudiant_id) REFERENCES etudiant (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE presence DROP FOREIGN KEY FK_6977C7A5F56318D8');
        $this->addSql('ALTER TABLE presence DROP FOREIGN KEY FK_6977C7A5DDEAB1A3');
        $this->addSql('DROP TABLE presence');
    }
}
