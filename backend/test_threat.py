from app.threat_intel.threat_service import ThreatIntelService


def main():
    service = ThreatIntelService()

    try:
        result = service.lookup(
            provider="virustotal",
            indicator="8.8.8.8"
        )

        print("\n===== VirusTotal Result =====")
        print(result)

    except Exception as e:
        print("\nError:")
        print(e)


if __name__ == "__main__":
    main()