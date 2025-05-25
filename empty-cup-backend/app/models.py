from app import db

class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    projects = db.Column(db.Integer, nullable=False)
    phone_1 = db.Column(db.String(15), nullable=False)
    phone_2 = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    years = db.Column(db.Integer, nullable=False)
    is_shortlisted = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'projects': self.projects,
            'phone_1': self.phone_1,
            'phone_2': self.phone_2,
            'price': self.price,
            'description': self.description,
            'rating': self.rating,
            'years': self.years,
            'is_shortlisted': self.is_shortlisted
        }

