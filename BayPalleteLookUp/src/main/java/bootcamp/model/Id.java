package bootcamp.model;

public class Id {
	int id;
	
	public Id() {
		
	}
	public Id(int id) {
		super();
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String toString(){
		return Integer.toString(id);
	}
	
	
}
