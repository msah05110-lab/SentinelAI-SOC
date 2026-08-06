from app.parsers.csv_parser import CSVParser

parser = CSVParser()

events = parser.parse("uploads/logs/test.csv")

print(events)