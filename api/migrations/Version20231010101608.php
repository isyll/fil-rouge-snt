<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231010101608 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ouverture (id INT AUTO_INCREMENT NOT NULL, classe_id INT NOT NULL, annee_scolaire_id INT NOT NULL, INDEX IDX_43461EAB8F5EA509 (classe_id), INDEX IDX_43461EAB9331C741 (annee_scolaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ouverture ADD CONSTRAINT FK_43461EAB8F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id)');
        $this->addSql('ALTER TABLE ouverture ADD CONSTRAINT FK_43461EAB9331C741 FOREIGN KEY (annee_scolaire_id) REFERENCES annee_scolaire (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ouverture DROP FOREIGN KEY FK_43461EAB8F5EA509');
        $this->addSql('ALTER TABLE ouverture DROP FOREIGN KEY FK_43461EAB9331C741');
        $this->addSql('DROP TABLE ouverture');
    }
}
