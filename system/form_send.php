<?php
class Form {
    public $title, $main_text, $types_of_work, $table_product, $adress, $deadline, $extra_text;
    public function __construct($title, $main_text, $types_of_work, $table_product, $adress, $deadline, $extra_text)
    {
      $this->title = $title;
      $this->main_text = $main_text;
      $this->types_of_work = $types_of_work;
      $this->table_product = $table_product;
      $this->adress = $adress;
      $this->deadline = $deadline;
      $this->extra_text = $extra_text;
    }
    public function setRow() {
        $connect = mysqli_connect("localhost", "root", "root", "saveuacivils");
        $query = "INSERT INTO `volunteering_task`(`title`, `main_text`, `types_of_work`, `table_product`, `adress_coordinates`, `deadline`, `extra_text`) VALUES ('{$this->title}','{$this->main_text}','{$this->types_of_work}','{$this->table_product}','{$this->adress}','{$this->deadline}','{$this->extra_text}')";
        mysqli_query($connect, $query);
        return $query;
    }
}
$data = json_decode(file_get_contents('php://input'), true);
$clientConnection = new Form($data['title'], $data['mainInfo'], $data['typeOfWork'], json_encode($data['table'], JSON_UNESCAPED_UNICODE), json_encode($data['adressLine']), $data['timer'], $data['extraInfo']);
echo $clientConnection->setRow();
?>