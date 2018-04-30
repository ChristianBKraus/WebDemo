package jupiterpa.webdemo.person;

public class Person {
    String vorname;
    String nachname;

    public Person(String vorname, String nachname) {
        this.vorname = vorname;
        this.nachname = nachname;
    }

    public String getVorname() {
        return vorname;
    }
    public String getNachname() {
        return nachname;
    }

    @Override
    public String toString() {
        return "Person: " + vorname + " " + nachname;
    }
}