from app import app
from flask import jsonify,request
from app.models import Contacts
from app import db

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    contacts = Contacts.query.all()
    return jsonify([contact.to_dict() for contact in contacts]), 200

@app.route('/api/toggle_shortlist/<int:contact_id>', methods=['POST'])
def shortlist_contact(contact_id):
    contact = Contacts.query.get(contact_id)
    contact.is_shortlisted = not contact.is_shortlisted
    db.session.commit()
    return jsonify({"updated": contact.to_dict()}), 200