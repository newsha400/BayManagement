package bootcamp.model;

public class Palette {

	int id;
	int width;
	int height;
	int length;
	String dep;
	String paletteClass;
	String category;
	int bay;	
	
	public Palette() {}
	


	public Palette(int id, int width, int height, int length, String dep, String paletteClass, String category,
			int bay) {
		super();
		this.id = id;
		this.width = width;
		this.height = height;
		this.length = length;
		this.dep = dep;
		this.paletteClass = paletteClass;
		this.category = category;
		this.bay = bay;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getDep() {
		return dep;
	}

	public void setDep(String dep) {
		this.dep = dep;
	}

	public String getPaletteClass() {
		return paletteClass;
	}

	public void setPaletteClass(String paletteClass) {
		this.paletteClass = paletteClass;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getBay() {
		return bay;
	}

	public void setBay(int bay) {
		this.bay = bay;
	}

	
	
	
}
